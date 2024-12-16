"use client"
import Image from 'next/image';
import CustomGraph from '../components/feedbackGraph';
import GuideDisplayFeedbackPage from '../feedback/FeedbackDisplayGuide';
import { Feedback } from '../feedback/feedback';
import { deleteFeedback, fetchFeedbacks } from '@/service/feedback.service';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getOneGuide, updateGuide,Guide } from '@/service/guide.service';
import { useSession } from 'next-auth/react';
import { getAllTechnology, Technology } from '@/service/technology.service';
import { Category, getAllCategory } from '@/service/category.service';
import { FaCamera} from 'react-icons/fa';
import ImageUploadModal from '../components/ImageUploadmodel';
import { Chip, useDisclosure } from '@nextui-org/react';
import Nav from '../components/nav1';
import {Box} from "@mui/system";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';


export default function Resume () {

    const { data: session } = useSession();
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [guide, setGuide] = useState<Guide | null>(null);
    const [formData, setFormData] = useState<Partial<Guide>>({});
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const searchParams = useSearchParams();
    const guideId = searchParams?.get('guideId');



    useEffect(() => {
        if (guideId) {
            getOneGuide(guideId).then(guide => {
                setGuide(guide);
                setFormData({
                    firstName: guide.firstName,
                    lastName: guide.lastName,
                    job: guide.job,
                    about: guide.about,
                    profilePic:guide.profilePic,
                    milestones: guide.milestones,
                    socialMediaLinks: Array.isArray(guide.socialMediaLinks) ? guide.socialMediaLinks : [],
                    technologies: guide.technologies?.map(tech => tech.id) || [],
                    categories: guide.categories?.map(cat => cat.id) || [],

                });
            }).catch(console.error);

            getAllTechnology().then(techs => {
                setTechnologies(techs);
            }).catch(console.error);

            getAllCategory().then(cats => {
                setCategories(cats);
            }).catch(console.error);
        }
    }, [guideId]);

    useEffect(() => {
        const loadFeedbacks = async () => {
            try {
                const data = await fetchFeedbacks(axios);
                setFeedbacks(data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        loadFeedbacks();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSMChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const links = value.split(',').map(link => link.trim());
        setFormData(prev => ({ ...prev, socialMediaLinks: links }));
    };
    const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const techId = e.target.value;
        const isChecked = e.target.checked;

        setFormData(prev => {
            let updatedTechnologies = prev.technologies || [];

            if (isChecked) {
                updatedTechnologies = [...updatedTechnologies, techId];
            } else {
                updatedTechnologies = updatedTechnologies.filter(t => t !== techId);
            }

            return { ...prev, technologies: updatedTechnologies };
        });

    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const catId = e.target.value;
        const isChecked = e.target.checked;

        setFormData(prev => {
            let updatedCategories = prev.categories || [];

            if (isChecked) {
                updatedCategories = [...updatedCategories, catId];
            } else {
                updatedCategories = updatedCategories.filter(c => c !== catId);
            }

            return { ...prev, categories: updatedCategories };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData && guideId) {
            const updatedGuide = { ...guide, ...formData, guideId } as Guide;
            try {
                const response = await updateGuide(updatedGuide);
                setGuide(response);
                setIsEditing(false);
                alert('Guide updated successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to update guide');
            }
        }
    };

    if (!session) {
        return <div>Loading...</div>;
    }

    if (!guide) {
        return <div>No guide found</div>;
    }

    const programmingLanguages = technologies.filter(tech => Number(tech.technologyType) === 0);
    const frameworks = technologies.filter(tech => Number(tech.technologyType) === 1);
    const databases = technologies.filter(tech =>Number(tech.technologyType) === 3);



    //  functions for feedbacks


    const handleDeleteFeedback = async (id: string) => {
        try {
            await deleteFeedback(axios, id);
            setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };



    const maxWords = 300;
    const words = guide.about.split(' ');
    const shouldTruncate = words.length > maxWords;
    const displayedText = shouldTruncate && !isExpanded ? words.slice(0, maxWords).join(' ') + '...' : guide.about;

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    console.log(guide.socialMediaLinks);

    return (

        <div className="absolute inset-0 w-full  rounded-l-lg">
            <Nav/>
            {!isEditing ? (

                <div className="absolute inset-0 w-full bg-gradient-to-br from-gray-700 via-black to-gray-800 text-white  rounded-l-lg">
                    <div className=" absolute inset-x-0 w-full h-[260px] bg-cover bg-center bg-gradient-to-br from-indigo-950 via-black to-indigo-950 " style={{ borderRadius: '0.75rem'  }}>
                        <hr className="my-64 border-t-5 " style={{ borderColor: '#FFFFFF' }}/>
                    </div>
                    <div className="text-center mt-10">

                        {/* image section   */}
                        <div className="relative w-80 h-80 mx-auto p-2  rounded-full top-20"  style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="relative w-full h-full bg-black rounded-full p-2">
                                <div className="relative w-full h-full bg-blue-800 rounded-full">
                                    <Image
                                        src={guide.profilePic}
                                        alt="Profile Picture"
                                        layout="fill"
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <ImageUploadModal visible={isOpen} closeHandler={onClose} setImageUrl={setImageUrl} guide={guide} />
                        <button
                            onClick={onOpen}
                            className="pencil-button relative left-36 m-6"
                            style={{ zIndex: 10 }}
                        >
                            <FaCamera size={22}/>
                        </button>


                        <div className=''>
                            <h2 className="text-4xl font-bold mt-4 text-gray-300">{guide.firstName} {guide.lastName}</h2>
                            <p className="text-lg text-gray-400">{guide.job}</p>
                            <p className="text-lg text-gray-500">{guide.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center  text-gray-200 rounded-md shadow-sm hover:bg-gray-400 mx-auto m-6"
                    >
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M14.293 3.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-.32.208l-3 1a1 1 0 0 1-1.269-1.27l1-3a1 1 0 0 1 .208-.32l10-10z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M15 5a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Edit Profile
                    </button>

                    <hr className="border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>

                    <div className="py-2  flex flex-col items-center text-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
                        <div className='w-full '>
                            <h3 className="text-2xl font-semibold flex items-center justify-center p-8 mr-10">
                                <img src="/images/24.png" alt="Info Icon" className="mr-4 w-14 h-14" /> About Me
                            </h3>
                            <div className=" mx-auto max-w-6xl  border border-gray-400 rounded-lg p-4 ">
                                <p className="m-4 text-xl text-gray-300">{displayedText}</p>
                                {shouldTruncate && (
                                    <button onClick={handleToggle} className="text-blue-500 hover:text-blue-700 mt-2">
                                        {isExpanded ? 'Read Less' : 'Read More'}
                                    </button>
                                )}
                            </div>
                        </div>


                        <hr className="mt-20 border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>

                        <div className="mt-6 mr-16">
                            <h3 className="text-3xl font-semibold flex items-center">
                                <img src="/images/29.png" alt="Info Icon" className="mr-2 w-16 h-16" />Social medias
                            </h3>
                        </div>

                        {guide.socialMediaLinks && guide.socialMediaLinks.length > 0 ? (
                            <ul className="mt-4 list-disc list-inside text-left">
                                {guide.socialMediaLinks.map((link, index) => (
                                    <li key={index} className="text-blue-500 hover:underline text-lg">
                                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-4 text-gray-500">No social media links available.</p>
                        )}



                        <hr className="mt-24 border-t-3 w-3/4 mx-auto  opacity-50" style={{ borderColor: '#BB86FC' }}/>


                        <div className='mr-20 mt-20 mb-10' >
                            <h3 className="text-3xl font-semibold flex items-center">
                                <img src="/images/25.png" alt="Info Icon" className="mr-2 w-20 h-20" />Skills
                            </h3>
                        </div>
                        <div className='mt-10 grid grid-cols-4  gap-4'>
                            {guide.technologies?.map((tech, index) => (
                                <Chip
                                    key={index}
                                    className="flex justify-center items-center bg-gradient-to-r from-pink-700 via-pink-800 to-pink-900 text-white text-xl font-semibold rounded-lg px-6 py-5 border border-transparent hover:border-gray-400 min-w-[150px] h-[40px]"
                                >
                                    {tech.technologyName}
                                </Chip>
                            ))}
                        </div>




                        <hr className="mt-24 border-t-3 w-3/4 mx-auto opacity-50" style={{ borderColor: '#BB86FC' }}/>


                        <div className=' mr-20 mt-20 mb-10'>
                            <h3 className="text-3xl font-semibold flex items-center">
                                <img src="/images/23.png" alt="Info Icon" className="mr-4 w-16 h-16" />Expertise
                            </h3>
                        </div>
                        <div className='mt-10  grid grid-cols-4 gap-4'>
                            {guide.categories?.map((cat, index) => (
                                <Chip
                                    key={index}
                                    className="flex justify-center items-center bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:shadow-white transition-shadow duration-300 overflow-hidden text-white text-xl font-semibold mr-2 mb-2 px-6 py-5 rounded-lg border border-transparent hover:border-gray-400 min-w-[300px] h-[40px] "
                                >
                                    {cat.categoryName}
                                </Chip>
                            ))}



                        </div>
                        <div className='bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white'>
                        </div>
                        <hr className="my-24 border-t-3 w-4/5 mx-auto" style={{ borderColor: '#32ae85' }}/>

                        <div className="mt-20 w-full flex flex-col items-center ">
                            <h3 className="text-3xl font-semibold flex juatify-center items-center mb-12">
                                <img src="/images/26.png" alt="Info Icon" className="mr-4 w-14 h-14" />Ratings
                            </h3>
                            <div className="w-full max-w-4xl">
                                <CustomGraph guideId={guide.id} />
                            </div>
                        </div>

                        <div className="mt-20 w-full flex flex-col items-center">
                            <h3 className="text-3xl font-semibold flex items-center mb-12  ">
                                <img src="/images/27.png" alt="Info Icon" className="mr-4 w-14 h-14" />What  mentees  say
                            </h3>
                            <GuideDisplayFeedbackPage feedbacks={feedbacks} handleDeleteFeedback={handleDeleteFeedback} />
                        </div>
                    </div>
                </div>

            ) : (
<Box sx={{marginTop:'150px',
paddingLeft:'200px',
paddingRight:'200px',
fontSize:'20px',
paddingBottom:'150px'}}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Job:</label>
                        <input
                            type="text"
                            name="job"
                            value={formData.job || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">About:</label>
                        <textarea
                            name="about"
                            value={formData.about || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Milestones:</label>
                        <textarea
                            name="milestones"
                            value={formData.milestones || ''}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Socia Media Links:</label>
                        <textarea
                            name="socialMediaLinks"
                            value={formData.socialMediaLinks?.join(', ') || ''}
                            onChange={handleSMChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Technologies:</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <h3 className="font-semibold">Programming Languages</h3>
                                {programmingLanguages.map(tech => (
                                    <div key={tech.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={tech.id}
                                            value={tech.id}
                                            checked={formData.technologies?.includes(tech.id)}
                                            onChange={handleTechnologyChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor={tech.id}>{tech.technologyName}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold">Frameworks</h3>
                                {frameworks.map(tech => (
                                    <div key={tech.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={tech.id}
                                            value={tech.id}
                                            checked={formData.technologies?.includes(tech.id)}
                                            onChange={handleTechnologyChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor={tech.id}>{tech.technologyName}</label>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h3 className="font-semibold">Databases</h3>
                                {databases.map(tech => (
                                    <div key={tech.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={tech.id}
                                            value={tech.id}
                                            checked={formData.technologies?.includes(tech.id)}
                                            onChange={handleTechnologyChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor={tech.id}>{tech.technologyName}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Categories:</label>
                        {categories.map(cat => (
                            <div key={cat.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={cat.id}
                                    value={cat.id}
                                    checked={formData.categories?.includes(cat.id)}
                                    onChange={handleCategoryChange}
                                    className="mr-2"
                                />
                                <label htmlFor={cat.id}>{cat.categoryName}</label>
                            </div>
                        ))}
                    </div>
                    <br/>
                    <button type="submit" className="mt-4 px-10 py-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">
                        Update Guide
                    </button>
                    <button onClick={() => setIsEditing(false)} type="button" className="mt-4 ml-4 px-10 py-4  bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700">
                        Cancel
                    </button>
                </form>
</Box>
            )}
        </div>
    );
};




