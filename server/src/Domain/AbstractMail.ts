export abstract class AbstractMail {
  public abstract templateId: string;

  constructor(
    public readonly receiver: string,
    public readonly substitutions: {},
  ) {}
}
