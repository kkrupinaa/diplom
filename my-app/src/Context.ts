import React from "react";
import { IFooter, ISection } from "./components/interfaces";

export const footerContext=React.createContext<React.Dispatch<React.SetStateAction<IFooter>>>(()=>{})
export const commonContext=React.createContext<[HTMLImageElement , React.Dispatch<React.SetStateAction<HTMLImageElement>>]>([new Image(),()=>{}])
export const sectionContext=React.createContext<ISection[]>([])