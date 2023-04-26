// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import kotoba from "@/data/kotoba";
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseAPI } from "..";

export interface DataType {
  content: string;
  date: string;
  reply?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseAPI>
) {
  const cursor = parseInt(req.query.cursor as string);
  const pageSize = 7;

  const data = kotoba.slice(cursor, cursor + pageSize);

  const nextId = cursor < kotoba.length - 1 ? cursor + pageSize : null;
  const previousId = cursor > pageSize - 1 ? cursor - pageSize : null;

  res.status(200).json({
    nextId,
    previousId,
    data,
  });
}
