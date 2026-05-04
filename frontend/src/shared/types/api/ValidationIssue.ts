export interface ValidationIssue {
  property: string;
  constraints: Record<string, string>;
}
