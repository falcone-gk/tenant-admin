import type { EventHandler, EventHandlerRequest } from "h3";
import type { ZodSchema, z } from "zod";

export const defineAuthenticatedResponseHandler = <T extends EventHandlerRequest, D> (
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const session = await requireUserSession(event);
      event.context.user = session.data;
      // do something after the route handler
      return await handler(event);
    }
    catch (err) {
      // Error handling
      return err;
    }
  });

export const defineAdminResponseHandler = <T extends EventHandlerRequest, D, E> (
  handler: EventHandler<T, D>,
  schema?: ZodSchema<E>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    try {
      const session = await requireAdminSession(event);
      event.context.user = session.data;
      if (!schema) {
        const response = await handler(event);
        // do something after the route handler
        return response;
      }

      const body = await readValidatedBody(event, schema.safeParse);
      if (!body.success) {
        throw createError({
          status: 400,
          statusMessage: "Validation Error",
          message: JSON.stringify(body.error.issues),
          data: body.error.issues,
        });
      }
      event.context.body = body.data;

      const response = await handler(event);
      // do something after the route handler
      return response;
    }
    catch (err) {
      // Error handling
      return err;
    }
  });
