export interface Client {
  id: string;
  name: string;
  logoId: string; // Maps to placeholder SVG component
}

export const clients: Client[] = [
  { id: "1", name: "FinTech Solutions", logoId: "fintech" },
  { id: "2", name: "ScaleOps", logoId: "scaleops" },
  { id: "3", name: "DataFlow Inc", logoId: "dataflow" },
  { id: "4", name: "CloudNine", logoId: "cloudnine" },
  { id: "5", name: "SecureBank", logoId: "securebank" },
  { id: "6", name: "InnovateLabs", logoId: "innovatelabs" },
  { id: "7", name: "TechVentures", logoId: "techventures" },
  { id: "8", name: "Nexus AI", logoId: "nexus" },
  { id: "9", name: "Quantum Systems", logoId: "quantum" },
  { id: "10", name: "Vertex Labs", logoId: "vertex" },
];
