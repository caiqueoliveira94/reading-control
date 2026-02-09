import { z } from "zod";

export const getPeriodStatsSchema = z.object({
    query: z.object({
        type: z.enum(['week', 'month', 'year', 'all-time']),
    }),
});