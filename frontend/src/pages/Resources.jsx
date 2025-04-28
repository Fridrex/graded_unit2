import { useState } from react;
import Glossary from '../components/resources/Glossary'
import Faq from '../components/resources/Faq'
import FurtherReading from '../components/resources/FurtherReading'

const Resources = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpen = () => {

    }

    return (
        <>
            <div className="resources">
                <div className="resources__header">
                    <h1></h1>
                </div>
                <div className="resources__info-blocks">
                    <div className="resources__info-blocks__glossary--preview">
                        <Glossary isOpen={isOpen}/>
                        <button onClick={handleIsOpen}></button>
                    </div>
                    <div className="resources__info-blocks__faq--preview">
                        <Faq isOpen={isOpen}/>
                        <button onClick={handleIsOpen}></button>
                    </div>
                    <div className="resources__info-blocks__further-reading--preview">
                        <FurtherReading isOpen={isOpen}/>
                        <button onClick={handleIsOpen}></button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Resources;
