import { Request, Response } from "express";
export declare const join: (req: Request, res: Response) => void;
export declare const edit: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const remove: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const login: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const logout: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const watch: (req: Request, res: Response) => Response<any, Record<string, any>>;
