
//GoToTop.js - helps to scroll on top of the page during routes on some pages without animation
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
 
export default function GoToTop() {
    const routePath = useLocation();
    const onTop = () => {
        // window.scrollTo(0, 0);
        document.documentElement.scrollTo({ top:0, left:0, behavior: "instant" });
    }
    useEffect(() => {
        onTop()
    }, [routePath]);
 
    return null;
}