/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Usecase {
  execute(input?: any): Promise<any>;
}
