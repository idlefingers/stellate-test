import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import * as crypto from 'node:crypto';

@Injectable()
export class SignedRequestGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const requestType = context.getType<GqlContextType>();

    // If it's not a graphql request, allow it
    if (requestType !== 'graphql') {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const signature = req.header('stellate-signature');

    const queryInfo = {
      query: req.body.query,
      variables: req.body.variables,
      operationName: req.body.operationName,
    };

    // Deny requests which don't include the signature
    if (!signature) {
      console.log('Request missing Stellate signature', queryInfo);
      return false;
    }

    const payload = JSON.stringify(queryInfo);
    const values = signature.split(',');
    const obj = {
      signature: '',
      expiry: '',
    };

    values.forEach((val: string) => {
      if (val.startsWith('v1:')) {
        obj.signature = val.replace('v1:', '');
      } else if (val.startsWith('expiry:')) {
        obj.expiry = val.replace('expiry:', '');
      }
    });

    console.log(obj.expiry);
    const sig = crypto
      .createHmac('sha256', 'secret')
      .update(payload)
      .digest('base64');

    if (
      !obj.signature ||
      !crypto.timingSafeEqual(
        Buffer.from(obj.signature, 'base64'),
        Buffer.from(sig, 'base64'),
      )
    ) {
      console.log('Stellate signature invalid', {
        payload,
        ourSignature: sig,
        stellateSignature: obj.signature,
        header: signature,
      });
      return false;
    }

    if (Date.now() > Number(obj.expiry)) {
      console.log('Stellate signature expired', queryInfo);
      return false;
    }

    return true;
  }
}
