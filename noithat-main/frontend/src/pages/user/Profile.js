import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../services/api';
import { setCredentials } from '../../redux/slices/authSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);

    // Available avatars list
    const availableAvatars = useMemo(() => [
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-avatar-dep-cho-con-gai-26.jpg',
        'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
        'https://jbagy.me/wp-content/uploads/2025/03/avatar-vo-tri-cute.jpg',
        'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-4.jpg',
        'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-doi-lot-soi.jpg?1704788224743',
    ], []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || '');
            setAddress(user.address || '');
            setSelectedAvatar(user.avatar || availableAvatars[0]);
        }
    }, [user, availableAvatars]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/users/profile', { 
                name, email, password, phone, address, avatar: selectedAvatar 
            });
            dispatch(setCredentials({ user: data, token: user.token }));
            setSnackbarMessage('Cập nhật hồ sơ thành công');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || 'Cập nhật thất bại');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleAvatarSelect = (avatarUrl) => {
        setSelectedAvatar(avatarUrl);
        setShowAvatarOptions(false);
    };

    const toggleAvatarOptions = () => {
        setShowAvatarOptions(!showAvatarOptions);
    };

    if (!user) return (
        <div className="flex items-center justify-center min-h-screen py-10 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                <h2 className="text-xl font-semibold text-gray-800">Vui lòng đăng nhập để xem hồ sơ</h2>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-8 px-4 bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGbtwD7iSKrU4GBJCuhMYLdqjrQzlsh_rGA&s")' }}>
            
            <div className="max-w-4xl mx-auto">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="h-40 bg-gradient-to-r from-indigo-800 to-blue-500 relative">
                        <h1 className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-md">
                            Thông tin tài khoản
                        </h1>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Avatar Section */}
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="relative mb-4">
                                    <img 
                                        src={selectedAvatar} 
                                        alt="Avatar"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md -mt-16"
                                    />
                                    <button 
                                        onClick={toggleAvatarOptions}
                                        className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-indigo-700 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
                                <p className="text-gray-500 text-sm mb-4">{email}</p>

                                {showAvatarOptions && (
                                    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-semibold text-gray-700">Chọn Avatar</h3>
                                            <button onClick={toggleAvatarOptions} className="text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="border-b border-gray-200 mb-3"></div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableAvatars.map((avatarUrl) => (
                                                <div key={avatarUrl} className="flex justify-center">
                                                    <div 
                                                        onClick={() => handleAvatarSelect(avatarUrl)}
                                                        className={`w-16 h-16 rounded-full overflow-hidden cursor-pointer transition transform hover:scale-105 ${
                                                            selectedAvatar === avatarUrl ? 'border-3 border-blue-500' : 'border-3 border-transparent'
                                                        }`}
                                                    >
                                                        <img 
                                                            src={avatarUrl} 
                                                            alt="Avatar Option" 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Section */}
                            <div className="w-full md:w-2/3">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full border-0 border-b-2 border-gray-300 pl-10 pb-2 pt-2 focus:outline-none focus:border-blue-500 bg-transparent text-gray-700"
                                            placeholder="Họ và tên"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="email" 
                                            className="w-full border-0 border-b-2 border-gray-300 pl-10 pb-2 pt-2 bg-transparent text-gray-500"
                                            placeholder="Email"
                                            value={email}
                                            disabled
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="tel" 
                                            className="w-full border-0 border-b-2 border-gray-300 pl-10 pb-2 pt-2 focus:outline-none focus:border-blue-500 bg-transparent text-gray-700"
                                            placeholder="Số điện thoại"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        </div>
                                        <textarea 
                                            className="w-full border-0 border-b-2 border-gray-300 pl-10 pb-2 pt-2 focus:outline-none focus:border-blue-500 bg-transparent text-gray-700 resize-none"
                                            placeholder="Địa chỉ"
                                            rows="2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        ></textarea>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input 
                                            type="password" 
                                            className="w-full border-0 border-b-2 border-gray-300 pl-10 pb-2 pt-2 focus:outline-none focus:border-blue-500 bg-transparent text-gray-700"
                                            placeholder="Mật khẩu mới (để trống nếu không đổi)"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <p className="text-xs text-gray-500 mt-1 ml-1">Tối thiểu 6 ký tự</p>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-800 to-blue-500 text-white font-medium rounded-full shadow-md hover:from-indigo-900 hover:to-blue-600 transition-all flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Cập nhật thông tin
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast notification */}
            {openSnackbar && (
                <div className={`fixed bottom-4 right-4 rounded-lg shadow-lg px-6 py-4 max-w-xs ${
                    snackbarSeverity === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white animate-fade-in-up`}>
                    <div className="flex items-center">
                        {snackbarSeverity === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        <span>{snackbarMessage}</span>
                        <button 
                            onClick={handleCloseSnackbar}
                            className="ml-4 text-white focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;