import { FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Mobile menu icons
// import category from "../../category";
import API from "../API";

const Header = () => {
	const [menu, setMenu] = useState("home");
	const [isOpen, setIsOpen] = useState(false); // Mobile menu state
	const [category,setCategory]=useState([])

	useEffect(()=>{
		API.get('/api/category').then(res=>{
			setCategory(res.data)
		})
	},[])
	
	return (
		<>
			{/* Banner Section */}
			<div className="w-full relative">
				<img src="banner.webp" alt="banner" className="w-full" />
				<div className="flex flex-col gap-3 items-center justify-center w-full text-white absolute left-0 lg:top-90 top-20">
					<img src="profile.png" alt="profile" className="w-40 rounded-lg" />
					<h1 className="text-2xl font-semibold">daraznepalfinds</h1>
					<p className="text-lg">Discover the best Daraz finds</p>
					<div className="flex gap-5 text-3xl">
						<a href="https://www.instagram.com/daraz.nepal.finds/" target="_blank" rel="noopener noreferrer">
							<FaInstagram />
						</a>
						<a href="https://www.youtube.com/@Daraznepalfinds" target="_blank" rel="noopener noreferrer">
							<FaYoutube />
						</a>
					</div>
				</div>
			</div>

			{/* Navbar Section */}
			<div className="lg:mt-55 mt-60 w-full">
				<nav className="relative">
					{/* Desktop Menu */}
					<ul className="hidden md:flex text-lg text-white gap-5 justify-center">
						<li>
							<Link
								to="/"
								className={`px-7 py-3 hover:bg-gray-800 rounded-lg transition ${
									menu === "home" ? "bg-gray-800" : ""
								}`}
								onClick={() => setMenu("home")}
							>
								Home
							</Link>
						</li>
						{category.map((x) => (
							<li key={x._id}>
								<Link
									to={`/category/${x._id}`}
									onClick={() => setMenu(x.name)}
									className={`capitalize px-7 py-3 hover:bg-gray-800 rounded-lg transition ${
										menu === x.name ? "bg-gray-800" : ""
									}`}
								>
									{x.name}
								</Link>
							</li>
						))}
					</ul>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-white text-2xl absolute right-5 top-0"
						onClick={() => setIsOpen(!isOpen)}
					>
						{isOpen ? <FiX /> : <FiMenu />}
					</button>

					{/* Mobile Menu */}
					{isOpen && (
						<ul className="md:hidden flex flex-col text-lg text-white bg-[#09122C] items-center py-5 gap-3">
							<li>
								<Link
									to="/"
									className={`px-7 py-3 hover:bg-gray-800 rounded-lg transition ${
										menu === "home" ? "bg-gray-800" : ""
									}`}
									onClick={() => {
										setMenu("home");
										setIsOpen(false);
									}}
								>
									Home
								</Link>
							</li>
							{category.map((x) => (
								<li key={x._id}>
									<Link
										to={`/category/${x.name}`}
										onClick={() => {
											setMenu(x.name);
											setIsOpen(false);
										}}
										className={`capitalize px-7 py-3 hover:bg-gray-800 rounded-lg transition ${
											menu === x.name ? "bg-gray-800" : ""
										}`}
									>
										{x.name}
									</Link>
								</li>
							))}
						</ul>
					)}
				</nav>
			</div>
		</>
	);
};

export default Header;
