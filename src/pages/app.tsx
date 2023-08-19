import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main";

export default function App() {
    return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" Component={Main}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
