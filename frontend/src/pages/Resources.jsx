const Resources = () => {
    return (
        <>
            <div className="resources">
                <div className="resources__header">
                    <h1></h1>
                </div>
                <div className="resources__info-blocks">
                    <div className="resources__info-blocks__glossary">
                        <div className="resources__info-blocks__glossary__header">
                            <h2></h2>
                        </div>
                        <div className="resources__info-blocks__glossary__main">
                            <h3></h3>
                            <ul>
                                <li>
                                    <p><span>Term</span> - description</p>
                                </li>
                            </ul>
                        </div>
                        <div className="resources__info-blocks__glossary__footer">
                            <p></p>
                            <button></button>
                        </div>
                    </div>
                    <div className="resources__info-blocks__faq">
                        <div className="resources__info-blocks__faq__header">
                            <h2></h2>
                        </div>
                        <div className="resources__info-blocks__faq__main">
                            <h3></h3>
                            <ul>
                                <li>
                                    <p>Question</p>
                                    <p>Answer</p>
                                </li>
                            </ul>
                        </div>
                        <div className="resources__info-blocks__faq__footer">
                            <p></p>
                            <button></button>
                        </div>
                    </div>
                    <div className="resources__info-blocks__further-reading">
                        <div className="resources__info-blocks__further-reading__header">
                            <h2></h2>
                        </div>
                        <div className="resources__info-blocks__further-reading__main">
                            <h3></h3>
                            <ul>
                                <li>
                                    <p>Resource</p>
                                    <Link to='/'></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="resources__info-blocks__further-reading__footer">
                            <p></p>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Resources;
