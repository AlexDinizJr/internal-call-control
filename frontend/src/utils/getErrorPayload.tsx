export const getErrorPayload = (error: unknown) => {
    const err = error as { response?: { data?: unknown } } | null | undefined;
    return err?.response?.data ?? error;
};