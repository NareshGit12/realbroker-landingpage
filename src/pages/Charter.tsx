import React from 'react';
import Seo from '@/components/seo/Seo';
import DocLayout, { NumberedText } from '@/components/site/DocLayout';

const CHARTER = `1. What We Stand For
Trust first: we work with brokers we can count on. No cutting corners, no backdoor deals.

2. Work Together
This is a network built for collaboration: share clean inventory, respect deals, and grow together.

3. Keep It Professional
Good photos, real listings, clear terms. Let's raise the bar for how our industry works.

4. Use Smart Tools
We use tech to cut out the chaos (no more WhatsApp spam!) and make real estate faster, simpler, and more profitable.`;

export default function Charter() {
  return <>
    <Seo title="RealBroker Charter | Our Founding Principles" description="The RealBroker charter: the principles of trust, transparency, and collaboration that guide every broker in our invite-only network." path="/charter" />
    <DocLayout current="/charter" title="Network charter"
      intro="Our mission: a network of high-quality, trusted brokers who connect, share leads and close deals faster, with full transparency and professionalism.">
      <NumberedText text={CHARTER} />
    </DocLayout>
  </>;
}
