import { useState, useRef, useEffect } from 'react';
import { userData } from '../global/atom.js';
import { useAtom } from 'jotai';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL=import.meta.env.VITE_API_URL
const api_cameraAuth = `${API_URL}/v1/auth/signInPhase2`


const CameraTake = () => {
	const [snapshot, setSnapshot] = useState('');
	const [isCameraStarted, setIsCameraStarted] = useState(false);
	const videoRef = useRef(null);
	const [userdata, setUserData] = useAtom(userData);
	const navigate = useNavigate();

	const navigateToLogin = () => {
		navigate('/');
	};

	const navigateToHome = () => {
		navigate('/exam_dashboard');
	}

	const handleRetake = () => {
		setSnapshot('');
		startCamera();
	};

	const handleStartCamera = () => {
		startCamera();
		setIsCameraStarted(true);
	};

	const startCamera = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((error) => {
				console.error('Error accessing camera:', error);
				alert('Failed to access the camera. Please check your permissions.');
			});
	};

	const handleSnapshot = async () => {
		if (!isCameraStarted) {
			alert('Please start the camera before taking a snapshot.');
			return;
		}

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
		const data = canvas.toDataURL('image/jpg');
		setSnapshot(data);
	};

	function dataURLtoBlob(dataURL) {
		const base64 = dataURL.split(',')[1];
		const binary = atob(base64);
		const array = [];
		for (let i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], { type: 'image/jpg' }); // Adjust the type according to your image format
	}

	const handleVerify = async () => {
		const dataBlob = dataURLtoBlob(snapshot);
		console.log(dataBlob);
		const formData = new FormData();
		formData.append('file', dataBlob, 'image.jpg');
		formData.append('email', userdata.email);
		const res = await axios.post(api_cameraAuth, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		console.log(res.data);
		localStorage.setItem('jwtToken', res.data.content.meta.access_token);
		navigateToHome();
	}

	useEffect(() => {
		const jwtToken = localStorage.getItem('jwtToken');
		if (jwtToken !== null) {
			const currentTime = Date.now() / 1000;
			const decodedToken = jwtDecode(jwtToken);
			if (decodedToken.exp < currentTime) {
				localStorage.removeItem('jwtToken');
				navigateToLogin();
			} else {
				navigateToHome();
			}
		}
	}, [])

	return (
		<div className="bg-[#243C5A] flex justify-center items-center h-screen font-serif">
			<div className="w-1/2 flex flex-column items-center">
				<div className="mx-auto w-full">
					{!isCameraStarted ? (
						handleStartCamera()
					) : (
						<>
							{snapshot ? (
								<>
									<img src={snapshot} alt="Snapshot" className='w-3/5 mx-auto' />
									<div className="flex flex-row m-4 justify-evenly w-4/5 mx-auto">
										<button type="button" onClick={handleRetake} className="bg-black text-white w-1/3 p-3 rounded-xl text-xl">
											Retake
										</button>
										<button type="button" onClick={handleVerify} className="bg-black text-white w-1/3 p-3 rounded-xl text-xl">
											Verify
										</button>
									</div>
								</>
							) : (
								<div className="w-3/5 mx-auto">
									<video ref={videoRef} className='w-full mx-auto' autoPlay />
								</div>
							)}
							{!snapshot && (
								<div className="flex flex-row m-4 justify-evenly w-4/5 mx-auto">
									<button type="button" onClick={handleSnapshot} className="bg-black text-white w-1/3 p-3 rounded-xl text-xl">
										Take Photo
									</button>
								</div>

							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CameraTake;
