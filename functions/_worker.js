import { createRequestHandler } from '@react-router/cloudflare';
import * as build from '../build/server';

export default createRequestHandler({ build });
