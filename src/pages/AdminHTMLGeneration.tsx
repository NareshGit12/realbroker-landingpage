import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, RefreshCw, ExternalLink, LogOut, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface QueueItem {
  id: string;
  entity_type: string;
  entity_id: string;
  status: string;
  priority: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
}

interface MetadataItem {
  entity_type: string;
  entity_id: string;
  html_path: string;
  last_generated_at: string;
  file_size_bytes: number;
  generation_duration_ms: number;
  needs_regeneration: boolean;
}

interface Broker {
  id: string;
  full_name: string | null;
  email: string | null;
  vanity_url: string | null;
  static_html_url: string | null;
}

const AdminHTMLGeneration = () => {
  const navigate = useNavigate();
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [metadata, setMetadata] = useState<MetadataItem[]>([]);
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedBrokerIds, setSelectedBrokerIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch queue items
      const { data: queueData, error: queueError } = await supabase
        .from("html_generation_queue")
        .select("*")
        .eq("entity_type", "broker")
        .order("created_at", { ascending: false })
        .limit(50);

      if (queueError) throw queueError;
      setQueueItems(queueData || []);

      // Fetch metadata
      const { data: metadataData, error: metadataError } = await supabase
        .from("html_generation_metadata")
        .select("*")
        .eq("entity_type", "broker")
        .order("last_generated_at", { ascending: false })
        .limit(50);

      if (metadataError) throw metadataError;
      setMetadata(metadataData || []);

      // Fetch all brokers
      const { data: brokersData, error: brokersError } = await supabase
        .from("profiles")
        .select("id, full_name, email, vanity_url, static_html_url")
        .order("full_name", { ascending: true });

      if (brokersError) throw brokersError;
      setBrokers(brokersData || []);
    } catch (error: any) {
      toast.error("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const processQueue = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-broker-html", {
        body: { process_queue: true },
      });

      if (error) throw error;

      toast.success(`Processed ${data.processed} broker profiles`);
      await fetchData();
    } catch (error: any) {
      toast.error("Error processing queue: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const generateSelectedBrokers = async () => {
    if (selectedBrokerIds.size === 0) {
      toast.error("Please select at least one broker");
      return;
    }

    setProcessing(true);
    try {
      let successCount = 0;
      const brokerIds = Array.from(selectedBrokerIds);
      
      for (const brokerId of brokerIds) {
        const { error } = await supabase.functions.invoke("generate-broker-html", {
          body: { broker_id: brokerId, add_to_queue: true },
        });

        if (!error) successCount++;
      }

      toast.success(`Added ${successCount} broker(s) to generation queue`);
      await fetchData();
      setSelectedBrokerIds(new Set());
    } catch (error: any) {
      toast.error("Error adding to queue: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const generateAllBrokers = async () => {
    setProcessing(true);
    try {
      const allBrokerIds = brokers.map(b => b.id);
      let successCount = 0;
      
      for (const brokerId of allBrokerIds) {
        const { error } = await supabase.functions.invoke("generate-broker-html", {
          body: { broker_id: brokerId, add_to_queue: true },
        });

        if (!error) successCount++;
      }

      toast.success(`Added ${successCount} broker(s) to generation queue`);
      await fetchData();
    } catch (error: any) {
      toast.error("Error adding to queue: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const toggleBrokerSelection = (brokerId: string) => {
    const newSelection = new Set(selectedBrokerIds);
    if (newSelection.has(brokerId)) {
      newSelection.delete(brokerId);
    } else {
      newSelection.add(brokerId);
    }
    setSelectedBrokerIds(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedBrokerIds.size === brokers.length) {
      setSelectedBrokerIds(new Set());
    } else {
      setSelectedBrokerIds(new Set(brokers.map(b => b.id)));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Broker HTML Generation</h1>
            <p className="text-muted-foreground">Manage static HTML generation for broker profiles</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Brokers List */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              All Brokers ({brokers.length})
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={toggleSelectAll}
                variant="outline"
                size="sm"
              >
                {selectedBrokerIds.size === brokers.length ? "Deselect All" : "Select All"}
              </Button>
              <Button
                onClick={generateSelectedBrokers}
                disabled={processing || selectedBrokerIds.size === 0}
                size="sm"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Generate Selected ({selectedBrokerIds.size})
                  </>
                )}
              </Button>
              <Button
                onClick={generateAllBrokers}
                disabled={processing}
                size="sm"
                variant="secondary"
              >
                Generate All
              </Button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto space-y-2">
            {brokers.map((broker) => (
              <div
                key={broker.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                onClick={() => toggleBrokerSelection(broker.id)}
              >
                <Checkbox
                  checked={selectedBrokerIds.has(broker.id)}
                  onCheckedChange={() => toggleBrokerSelection(broker.id)}
                />
                <div className="flex-1">
                  <div className="font-medium">
                    {broker.full_name || "No name"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {broker.email || "No email"}
                  </div>
                </div>
                {broker.static_html_url && (
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Generated
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Generation Controls */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Queue Controls</h2>
          
          <div className="space-y-4">
            <Button
              onClick={processQueue}
              disabled={processing}
              className="w-full sm:w-auto"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Process Queue (Next 10)
                </>
              )}
            </Button>

            <Button onClick={fetchData} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </Card>

        {/* Queue Status */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Generation Queue ({queueItems.length})
          </h2>
          
          <div className="space-y-3">
            {queueItems.length === 0 ? (
              <p className="text-muted-foreground">No items in queue</p>
            ) : (
              queueItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">
                        {item.entity_id}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Priority: {item.priority} | Created:{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                    {item.error_message && (
                      <div className="text-sm text-red-600 mt-1">
                        Error: {item.error_message}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Generated Files */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Generated Files ({metadata.length})
          </h2>
          
          <div className="space-y-3">
            {metadata.length === 0 ? (
              <p className="text-muted-foreground">No generated files yet</p>
            ) : (
              metadata.map((item) => (
                <div
                  key={`${item.entity_type}-${item.entity_id}`}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm">{item.entity_id}</span>
                      {item.needs_regeneration && (
                        <Badge variant="outline" className="bg-yellow-100">
                          Needs Update
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size: {(item.file_size_bytes / 1024).toFixed(2)} KB |
                      Generated in: {item.generation_duration_ms}ms |
                      Last: {new Date(item.last_generated_at).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Path: {item.html_path}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://www.realbroker.app${item.html_path}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminHTMLGeneration;
