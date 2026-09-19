import { taxationData } from './taxation';
import { epfData } from './epf';
import { insuranceData } from './insurance';
import { sipData } from './sip';
import { mutualFundsData } from './mutual-funds';
import { aiData } from './ai';
import { mlData } from './ml';
import { llmsData } from './llms';
import { promptEngineeringData } from './prompt-engineering';

export const pathDatabase: Record<string, any> = {
  "indian-taxation": taxationData,
  "provident-fund": epfData,
  "insurance-strategy": insuranceData,
  "sip-mastery": sipData,
  "mutual-funds": mutualFundsData,
  "ai-foundations": aiData,
  "machine-learning": mlData,
  "llms": llmsData,
  "prompt-engineering": promptEngineeringData
};