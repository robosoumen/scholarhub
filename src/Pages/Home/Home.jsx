import Banner from './Banner';
import FAQ from './FAQ ';
import SuccessStories from './SuccessStories ';
import TopScholarships from './TopScholarships ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <SuccessStories></SuccessStories>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;