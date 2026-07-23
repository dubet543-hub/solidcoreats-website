import Legal from './Legal';
import { TERMS } from '../legal/content';

export default function Terms() {
  return (
    <Legal
      docTitle="Terms & Conditions"
      title="Terms & Conditions"
      intro="Please read these terms carefully. Sections 3 to 6, 8 and 10 cover medical limitations, assumption of risk, tracking consent and liability — they affect your legal rights."
      sections={TERMS}
    />
  );
}
