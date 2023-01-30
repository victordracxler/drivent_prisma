import { ApplicationError } from '@/protocols';

export function itemNotFoundError(): ApplicationError {
  return {
    name: 'itemNotFoundError',
    message: 'Not found',
  };
}
