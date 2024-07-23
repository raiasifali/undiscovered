import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import AboutMeForm from './forms/About';
import AcademicsForm from './forms/Academics';
import AthleticAccomplishmentsForm from './forms/Accomplishments';
import CoachInformationForm from './forms/CoachInformation';
import ContactInformationForm from './forms/ContackInformation';
import OffersForm from './forms/Offers';
import PersonalInformationForm from './forms/PesonalInformation';
import UploadMediaForm from './forms/UploadMedia';
import './progressBar.css';
import axios from 'axios';
import { BASE_URL } from '../../baseurl/baseurl';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
import 'toastr/build/toastr.min.css';
import {
  ProfileCreateContext,
  ProfileProvider,
  useProfileContext,
} from '../../components/context/createProfileContext';
function CreateProfile({ data }) {
  const { state, dispatch } = useProfileContext();
  const [isLoading, setIsLoading] = useState(true);
  const [accomplishments, setAccomplishments] = useState(['']);
  const [currentUser, setCurrentUser] = useState();
  const [socialLinks, setsocialLinks] = useState({
    twitter: {
      name: 'twitter',
      link: '',
    },
    tiktok: {
      name: 'tiktok',
      link: '',
    },
    facebook: {
      name: 'facebook',
      link: '',
    },
    instagram: {
      name: 'instagram',
      link: '',
    },
  });

  // const [state, setState] = useState({
  //   about: '', phoneNumber: '', jerseyNumber: '', birthPlace: '', starRating: '', athleticaccomplishments: [], name: '', location: '', position: '', height: '', weight: '', offers: [{
  //     type: "",
  //     university: "",
  //     status: "",
  //     date: ""
  //   }], coach: [{
  //     name: '',
  //     phone: '',
  //     email: '',
  //     picture: '',
  //     coachProgram: ''
  //   }], socialLinks: [{
  //     social_type: '', link: ''
  //   }], stats: '', academics: {
  //     gpa: '',
  //     satScore: '',
  //     actScore: '',
  //     ncaaId: ''
  //   }, playerClass: '', universityName: '', picture: '', logo: ''
  // })

  const [mediaFiles, setMediaFiles] = useState([]);

  const navigate = useNavigate();

  const step1Content = <PersonalInformationForm data={data} />;
  const step2Content = (
    <ContactInformationForm data={data} setsocialLinks={setsocialLinks} />
  );
  const step3Content = <AcademicsForm data={data} />;
  const step4Content = <AboutMeForm data={data} />;
  const step5Content = (
    <AthleticAccomplishmentsForm
      accomplishments={accomplishments}
      setAccomplishments={setAccomplishments}
      data={data}
    />
  );
  const step6Content = <CoachInformationForm data={data} />;
  const step7Content = <OffersForm data={data} />;

  const step8Content = (
    <UploadMediaForm mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />
  );

  function step1Validator() {
    console.log('state');
    console.log(state);
    // Add validation logic for step 2 if needed

    // if (state?.
    //   personalInformation
    //   ?.name?.length == 0) {
    //   toastr.error("Please enter name")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.universityName?.length == 0) {
    //   toastr.error("Please enter school")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.jerseyNumber?.length == 0) {
    //   toastr.error("Please enter jersey number")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.height?.length == 0) {
    //   toastr.error("Please enter height")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.weight?.length == 0) {
    //   toastr.error("Please enter weight")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.playerClass?.length == 0) {
    //   toastr.error("Please enter class")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.location?.length == 0) {
    //   toastr.error("Please enter location")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.position?.length == 0) {
    //   toastr.error("Please enter position")
    //   return false
    // } else if (state?.
    //   personalInformation
    //   ?.picture?.length == 0) {
    //   toastr.error("Please select profile picture")
    //   return false
    // }
    return true; // Return true for now assuming validation passes
  }

  function step2Validator() {
    // Add validation logic for step 2 if needed
    // const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/;

    // if (data?.phoneNumber?.trim().length === 0) {
    //   toastr.error("Please enter phone number");
    //   return false;
    // } else if (!phoneRegex.test(data?.phoneNumber)) {
    //   toastr.error("Please enter a valid phone number");
    //   return false
    // }
    return true; // Return true for now assuming validation passes
  }

  function step3Validator() {
    // if (data?.academics?.gpa?.length == 0) {
    //   toastr.error("Please enter gpa")
    //   return false
    // } else if (data?.academics?.satScore?.length == 0) {
    //   toastr.error("Please enter satScore")
    //   return false;
    // } else if (data?.academics?.actScore?.length == 0) {
    //   toastr.error("Please enter actscore")
    //   return false
    // } else if (data?.academics?.ncaaId?.length == 0) {
    //   toastr.error("Please enter nnccaId")
    //   return false
    // }

    return true;
  }

  function step4Validator() {
    // if (data?.about?.length == 0) {
    //   toastr.error("Please write about yourself")
    //   return false
    // }

    return true;
  }
  useEffect(() => {
    console.log('this is whole state', state);
    // step1Validator();
  }, [state]);

  function step5Validator() {
    // let pass = false;
    // data?.athleticaccomplishments?.map((val, i) => {
    //   if (val?.length == 0) {
    //     toastr.error("Please provide your athletic acomplishment")
    //     pass = false;
    //     return false
    //   } else {
    //     pass = true;
    //   }
    // })
    // if (pass == false) {
    //   return false
    // }

    return true;
  }

  function step6Validator() {
    // const coach = data.coach[0];
    // console.log(coach)
    // if (coach?.name?.length == 0) {
    //   toastr.error("Please enter coach name")
    //   return false
    // } else if (coach?.email?.length == 0) {
    //   toastr.error("Please enter email")
    //   return false;
    // } else if (coach?.phoneNumber?.length == 0) {
    //   toastr.error("Please enter number")
    //   return false
    // }

    return true;
  }

  function step7Validator() {
    // const offerDate = new Date(data.offers[0].date);
    // const offerYear = offerDate.getFullYear();
    // const currentYear = new Date().getFullYear();

    // if (data?.offers[0]?.status?.length == 0) {
    //   toastr.error("Please enter status")
    //   return false
    // } else if (data?.offers[0]?.date?.length == 0) {
    //   toastr.error("Please enter date")
    //   return false
    // } else if (data?.offers[0]?.university?.length == 0) {
    //   toastr.error("Please enter university")
    //   return false
    // } else if (data?.offers[0]?.type?.length == 0) {
    //   toastr.error("Please select type")
    //   return false
    // } else if (data?.offers[0]?.logo?.length == 0) {
    //   toastr.error("Please select logo")
    //   return false
    // } else if (offerYear > currentYear) {
    //   toastr.error("Please enter a valid date (not in the future)");
    //   return false;
    // }

    return true;
  }

  function step8Validator() {
    if (mediaFiles?.length == 0) {
      toastr.error('Please select images');
      return false;
    }

    return true;
  }

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }, [localStorage.getItem('user')]);

  const onFormSubmit = async (e) => {
    if (state?.personalInformation?.name?.length == 0) {
      toastr.error('Please enter name');
      return false;
    } else if (state?.personalInformation?.universityName?.length == 0) {
      toastr.error('Please enter school');
      return false;
    } else if (state?.personalInformation?.jerseyNumber?.length == 0) {
      toastr.error('Please enter jersey number');
      return false;
    } else if (state?.personalInformation?.height?.length == 0) {
      toastr.error('Please enter height');
      return false;
    } else if (state?.personalInformation?.weight?.length == 0) {
      toastr.error('Please enter weight');
      return false;
    } else if (state?.personalInformation?.playerClass?.length == 0) {
      toastr.error('Please enter class');
      return false;
    } else if (state?.personalInformation?.location?.length == 0) {
      toastr.error('Please enter location');
      return false;
    } else if (state?.personalInformation?.position?.length == 0) {
      toastr.error('Please enter position');
      return false;
    } else if (state?.personalInformation?.picture?.length == 0) {
      toastr.error('Please select profile picture');
      return false;
    }

    const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s./0-9]*$/;

    if (state?.contactDetail?.phoneNumber?.trim().length === 0) {
      toastr.error('Please enter phone number');
      return false;
    } else if (!phoneRegex.test(state?.contactDetail?.phoneNumber)) {
      toastr.error('Please enter a valid phone number');
      return false;
    }

    if (state?.academics?.gpa?.length == 0) {
      toastr.error('Please enter gpa');
      return false;
    } else if (state?.academics?.satScore?.length == 0) {
      toastr.error('Please enter satScore');
      return false;
    } else if (state?.academics?.actScore?.length == 0) {
      toastr.error('Please enter actscore');
      return false;
    }

    if (state?.about?.length == 0) {
      toastr.error('Please write about yourself');
      return false;
    }
    let pass = false;
    state?.accomplishments?.map((val, i) => {
      if (val?.length == 0) {
        toastr.error('Please provide your athletic acomplishment');
        pass = false;
        return false;
      } else {
        pass = true;
      }
    });
    if (pass == false) {
      return false;
    }

    const offerDate = new Date(state.offers.date);
    const offerYear = offerDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const isValidEmail = (email) => {
      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (state?.coachinformation?.email) {
      if (isValidEmail(state.coachinformation.email)) {
      } else {
        toastr.error('Invalid email format');
        return false;
      }
    }
    const isValidBirthPlace = (birthPlace) => {
      // Regular expression for city, state format validation
      const birthPlaceRegex = /^[a-zA-Z\s]+,\s*[a-zA-Z]{2}$/;
      return birthPlaceRegex.test(birthPlace);
    };

    if (state?.personalInformation?.birthPlace) {
      const birthPlace = state.personalInformation.birthPlace.trim(); // Trim whitespace
      if (isValidBirthPlace(birthPlace)) {
      } else {
        toastr.error('Invalid birth place format');
        console.log(state);
        return false;
      }
    }

    if (state?.offers?.status?.length == 0) {
      toastr.error('Please enter status');
      return false;
    } else if (state?.offers?.date?.length == 0) {
      toastr.error('Please enter date');
      return false;
    } else if (state?.offers?.university?.length == 0) {
      toastr.error('Please enter university');
      return false;
    } else if (state?.offers?.logo?.length == 0) {
      toastr.error('Please select logo');
      return false;
    } else if (offerYear > currentYear) {
      toastr.error('Please enter a valid date (not in the future)');
      return false;
    }

    let accomp = JSON.parse(localStorage.getItem('accomplishments'));
    let coach = JSON.parse(localStorage.getItem('coaches'));
    let data = {
      ...state,
      socialLinks: [
        { social_type: 'facebook', link: socialLinks.facebook.link },
        { social_type: 'instagram', link: socialLinks.instagram.link },
        { social_type: 'tiktok', link: socialLinks.tiktok.link },
        { social_type: 'twitter', link: socialLinks.twitter.link },
      ],
      athleticaccomplishments: accomp,
      coach: coach,
    };
    let formdata = new FormData();
    let contactdetails = [];
    let contactDetail = state?.contactDetail;
    for (let key in contactDetail) {
      if (contactDetail[key].length > 0) {
        contactdetails.push({
          social_type: key,
          link: contactDetail[key],
        });
      }
    }
    console.log(state);
    formdata.append('about', state.aboutme);
    formdata.append('academics', JSON.stringify(state.academics));
    formdata.append('athleticaccomplishments', state.accomplishments);
    formdata.append('birthPlace', state?.personalInformation?.birthPlace);
    formdata.append('coach', JSON.stringify(state.coachinformation));
    formdata.append('height', state.personalInformation.height);
    formdata.append('jerseyNumber', state.personalInformation.jerseyNumber);
    formdata.append('location', state.personalInformation.location);
    formdata.append('picture', state.personalInformation.picture);

    formdata.append('name', state.personalInformation.name);
    formdata.append('offers', JSON.stringify(state.offers));
    formdata.append('phoneNumber', state.contactDetail.phoneNumber);
    formdata.append('playerClass', state.personalInformation.playerClass);
    formdata.append('position', state.personalInformation.position);
    formdata.append('socialLinks', JSON.stringify(contactdetails));
    formdata.append('uploadVideos', JSON.stringify(state.uploadVideos));
    formdata.append('videoLinks', JSON.stringify(state.videoLinks));
    formdata.append('starRating', '1');
    // formdata.append('stats',data.stats)
    formdata.append('universityName', state.personalInformation.universityName);
    formdata.append('logo', state?.offers?.logo);
    // formdata.append('images',mediaFiles)

    state.mediaFiles.forEach((file, index) => {
      console.log('FILE new');
      console.log(file.file);
      formdata.append(`images`, file.file);
    });

    formdata.append('weight', state.personalInformation.weight);

    console.log('OFFERS');
    console.log(state.offers);

    state?.offers?.map((val, i) => {
      formdata.append('logo', val.logo);
    });

    let headers = {
      headers: {
        authorization: `Bearer ${currentUser?.token}`,
      },
    };

    try {
      let response = await axios.post(
        `${BASE_URL}/create-player-profile`,
        formdata,
        headers
      );

      if (response.status === 200) {
        toastr.success('Profile created successfully');
        navigate('/');
      }
    } catch (error) {
      if (error?.response?.data?.error) {
        toastr.error(error.response.data.error);
      } else {
        toastr.error('Server error, please try again');
      }
    }
  };
  return (
    <div className="progressContainer">
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: 'Contact Information',
            name: 'step1',
            validator: step1Validator,
            content: step1Content,
          },
          {
            label: 'Contact Detail',
            name: 'step2',
            content: step2Content,
            validator: step2Validator,
          },
          {
            label: 'Academics',
            name: 'step3',
            content: step3Content,
            validator: step3Validator,
          },
          {
            label: 'About Me',
            name: 'step4',
            content: step4Content,
            validator: step4Validator,
          },
          {
            label: 'Athletic Accomplishments',
            name: 'step5',
            content: step5Content,
            validator: step5Validator,
          },
          {
            label: 'Coach Information',
            name: 'step6',
            content: step6Content,
            validator: step6Validator,
          },
          {
            label: 'Offers',
            name: 'step7',
            content: step7Content,
            validator: step7Validator,
          },
          {
            label: 'Upload videos/photos',
            name: 'step8',
            content: step8Content,
            validator: step8Validator,
          },
        ]}
        progressStyles={{
          stepBar: {
            display: 'flex',
            flexDirection: 'column',
          },
          step: {
            flex: 1,
            textAlign: 'left',
            marginBottom: '20px',
            marginRight: '20px',
          },
          stepButton: {
            marginTop: '10px',
          },
        }}
      />
    </div>
  );
}

export default React.memo(CreateProfile);
