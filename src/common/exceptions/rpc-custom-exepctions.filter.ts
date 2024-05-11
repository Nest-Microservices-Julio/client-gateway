import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    console.log(rpcError.toString());
    
    if (rpcError.toString().toLowerCase().includes("Empty Response".toLowerCase())) {
      return response.status(500).json({
        status: 500,
        error: rpcError.toString().substring(0, rpcError.toString().indexOf("(") - 1)
      });
    }

    if (typeof rpcError === "object" && 'status' in rpcError && 'message' in rpcError) {
      // @ts-ignore
      const status = isNaN(rpcError.status) ? 400 : +rpcError.status;
      return response.status(rpcError.status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      error: rpcError,
    });
  }
}
