import React from "react";
import { IFooter, ISection } from "./components/interfaces";

export const FooterContext = React.createContext<React.Dispatch<React.SetStateAction<IFooter>>>(()=>({
    firstTitle: '',
    secondTitle: '',
    photo: '',
    liked: false
}))
export const CommonContext = React.createContext<[HTMLImageElement, React.Dispatch<React.SetStateAction<HTMLImageElement>>]>([new Image(), () => new Image()])
export const SectionContext = React.createContext<ISection[]>([])