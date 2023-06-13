export default function Iframe(props) {
    return <>
        <iframe allowFullScreen title={props.title} allow={props.allow} src={props.src} style={{width: `100%`, height: `1080px`, margin: `20px auto`}} />
    </>
}