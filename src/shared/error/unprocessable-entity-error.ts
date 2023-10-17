export class UnprocessableEntityError extends Error {
  constructor(data: any) {
    super(`Unprocessable Entity: ${data}.`);
    this.name = 'UnprocessableEntity';
  }
}
