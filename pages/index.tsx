import Link from 'next/link'
import React from 'react';
import Layout from '../components/Layout'

interface Item { 
  title: string;
}

const IndexPage = () => {
  const [items, setItems] = React.useState<Item[]>([]);

  const handleFetch = async () => {
    const res = await fetch('/api/search');
    const json = await res.json();

    setItems(json.MediaContainer.Metadata);
  }
  
  return (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Schwipe</h1>
    <a href="/api/login">Login</a>
    <a href="#" onClick={handleFetch}>Fetch</a> 
      
    <div>
  {items.map(item => <div>{item.title}</div>)}
    </div>
  </Layout>
)
  }

export default IndexPage

