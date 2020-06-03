export class CenterService {
  activationCount = 0;
  deActivationCount = 0;

  countActivation() {
    this.activationCount++;
  }

  countDeActivation() {
    this.deActivationCount++;
  }
}
