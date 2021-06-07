import { Request, Response } from "express";
export declare const home: (req: Request, res: Response) => Promise<void | Response<any, Record<string, any>>>;
export declare const search: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const getUpload: (req: Request, res: Response) => void;
export declare const postUpload: (req: Request, res: Response) => Promise<void>;
export declare const watch: (req: Request, res: Response) => void;
export declare const getEdit: (req: Request, res: Response) => void;
export declare const postEdit: (req: Request, res: Response) => void;
export declare const deleteVideo: (req: Request, res: Response) => Response<any, Record<string, any>>;
