export class Mail {
  constructor(
    public readonly receiver: string,
    public readonly templateId: string,
    public readonly substitutions: {},
  ) {}
}
