import classes from './InnerCard.module.css';

const InnerCard = (props) => {
	return (
		<section className={`${classes.card} ${props.className}`}>
			{props.children}
		</section>
	);
};

export default InnerCard;
