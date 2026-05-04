import { CompareRowValue } from '@/shared/types/domain/CompareRowValue';

export interface CompareRow {
  key: string;
  label: string;
  values: CompareRowValue[];
}
