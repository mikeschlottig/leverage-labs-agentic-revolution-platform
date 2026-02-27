export const AGENT_LIST = [
  { id: '1', name: 'Ops_Commander', status: 'Online', model: 'gemini-2.5-pro', description: 'Monitors infrastructure health and executes failover protocols.' },
  { id: '2', name: 'Knowledge_Aggregator', status: 'Idle', model: 'gpt-4o', description: 'Indexes documentation and provides RAG capabilities for devs.' },
  { id: '3', name: 'Deploy_Bot', status: 'Online', model: 'gemini-2.0-flash', description: 'Automates staging and production deployments.' },
  { id: '4', name: 'Security_Sentry', status: 'Online', model: 'claude-3.5-sonnet', description: 'Scans logs for anomalous behavior and triggers alerts.' },
];
export const SYSTEM_METRICS = [
  { time: '00:00', requests: 400 },
  { time: '04:00', requests: 300 },
  { time: '08:00', requests: 900 },
  { time: '12:00', requests: 1200 },
  { time: '16:00', requests: 1500 },
  { time: '20:00', requests: 1100 },
  { time: '23:59', requests: 800 },
];
export const RECENT_ACTIVITY = [
  { title: "Agent 'Ops_Commander' triggered auto-scale", time: "2 mins ago", type: "info" },
  { title: "Database D1 'Studio_DB' backup completed", time: "15 mins ago", type: "success" },
  { title: "Unauthorized access attempt blocked (IP: 192.x.x.x)", time: "45 mins ago", type: "error" },
  { title: "New worker 'studio-auth' deployed successfully", time: "1 hour ago", type: "success" },
  { title: "Knowledge Aggregator indexed 24 new files", time: "3 hours ago", type: "info" },
];
export const KNOWLEDGE_BASE_ITEMS = [
  { id: 'k1', title: 'Agents SDK V1 Manual', type: 'doc', updated: '2024-03-20' },
  { id: 'k2', title: 'Edge Performance Guide', type: 'wiki', updated: '2024-03-18' },
  { id: 'k3', title: 'D1 Schema Best Practices', type: 'snippet', updated: '2024-03-15' },
];