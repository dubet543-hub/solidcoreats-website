import Legal from './Legal';
import { PRIVACY } from '../legal/content';

export default function Privacy() {
  return (
    <Legal
      docTitle="Privacy Policy"
      title="Privacy Policy"
      intro="How your training, recovery and body-composition data is collected, processed and controlled."
      sections={PRIVACY}
    />
  );
}
