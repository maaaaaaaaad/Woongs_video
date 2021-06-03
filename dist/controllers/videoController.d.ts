import { Request, Response } from "express";
export declare const popular: (req: Request, res: Response) => void;
export declare const search: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const upload: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const see: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const edit: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const deleteVideo: (req: Request, res: Response) => Response<any, Record<string, any>>;
