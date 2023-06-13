import { useContext } from "react";
import { StateContext, dev } from "../../pages/_app";

export default function Concentration(props) {

    const { buttonText, setButtonText, gameFormStep, setGameFormStep } = useContext<any>(StateContext);

    const ConcentrationGameFormSubmit = (ConcentrationGameFormSubmitEvent) => {
        ConcentrationGameFormSubmitEvent.preventDefault();

        dev() && console.log(`ConcentrationGameFormSubmit Target`, ConcentrationGameFormSubmitEvent?.target);

        if (gameFormStep == 1) {
            setButtonText(`Start Game`);
            setGameFormStep(gameFormStep + 1);
        } else {
            setButtonText(`Next`);
            setGameFormStep(1);
        }
    }

    return <>
        <div id={`ConcentrationGame`} title={props.title} style={{width: `100%`, margin: `20px auto`}}>
            <form className={`ConcentrationGameForm ${gameFormStep == 1 ? `first` : `next`}`} id={`ConcentrationGameForm`} onSubmit={(ConcentrationGameFormSubmitEvent) => ConcentrationGameFormSubmit(ConcentrationGameFormSubmitEvent)}>
                <label htmlFor={`topic`}>Topic</label>
                <input type={`text`} name={`topic`} id={`topic`} placeholder={`Topic`} required />
                {gameFormStep != 1 && <div className={`more`}>
                    <label htmlFor={`timeLimit`}>Time Limit</label>
                    <input type={`text`} name={`timeLimit`} id={`timeLimit`} placeholder={`Time Limit`} required />
                    <button className={`ConcentrationGameFormSubmit`} type={`submit`}>{buttonText}</button>
                </div>}
            </form>
        </div>
    </>
}