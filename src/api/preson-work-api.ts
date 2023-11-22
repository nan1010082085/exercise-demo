import { graphql, buildSchema } from 'graphql';

export interface RandomObj {
  id: string;
  type: string[];
  width: number;
  height: number;
}

export enum IType {
  'container',
  'table',
  'input'
}

export const getRandomObj = () => {
  const schema = buildSchema(`
  type Query {
    id: ID!
    type: [String]!
    width: Int!
    height: Int!
  }`);
  const source = `{ id,width,height }`;
  const rootValue = {
    id: Math.ceil(Math.random() * 10000000),
    width: Math.ceil(Math.random() * 1000),
    height: Math.ceil(Math.random() * 500)
  };
  return graphql({ schema, source, rootValue });
};
