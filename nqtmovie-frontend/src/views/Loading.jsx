import styles from "./loading.module.css";
export default function Loading() {
    return (
        <div className="text-white d-flex w-100 justify-content-center align-items-center" style={{height:'80vh'}}>
            <div className={styles.loader}></div>
        </div>
    )
}