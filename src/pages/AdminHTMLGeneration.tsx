import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, RefreshCw, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

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

const AdminHTMLGeneration = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [metadata, setMetadata] = useState<MetadataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState<string>("");

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

  const generateSingleBroker = async () => {
    if (!selectedBrokerId) {
      toast.error("Please enter a broker ID");
      return;
    }

    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-broker-html", {
        body: { broker_id: selectedBrokerId },
      });

      if (error) throw error;

      toast.success("Broker HTML generated successfully");
      await fetchData();
      setSelectedBrokerId("");
    } catch (error: any) {
      toast.error("Error generating HTML: " + error.message);
    } finally {
      setProcessing(false);
    }
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
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Broker HTML Generation</h1>
          <p className="text-muted-foreground">Manage static HTML generation for broker profiles</p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Generation Controls</h2>
          
          <div className="space-y-4">
            <div>
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
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Broker ID (UUID)"
                value={selectedBrokerId}
                onChange={(e) => setSelectedBrokerId(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button onClick={generateSingleBroker} disabled={processing}>
                Generate
              </Button>
            </div>

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
                    onClick={() => window.open(`https://show.realbroker.app${item.html_path}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminHTMLGeneration;
