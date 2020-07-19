import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { Title, Wrapper } from "../../components/MiniComponents";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core/";
import ProjectCard from "../../components/ProjectCard";
import ProjectDialog from "../../components/ProjectDialog";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import projectAPI from "../../utils/projectAPI";

const useStyles = makeStyles((theme) => ({
	dynamicgrid: {
		flexGrow: 1,
		padding: theme.spacing(2)
	},
	fab: {
		position: "absolute",
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	}
}));

const Dashboard = () => {
	const classes = useStyles();
	const [projects, setProjects] = useState([]);
	const [openCreate, setOpenCreate] = useState(false);

	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = () => {
		projectAPI
			.getAllProjects()
			.then((res) => {
				// let newRes = res.concat(res);
				setProjects(res);
			})
			.catch((err) => console.error(err));
	};

	return (
		<Container maxWidth="lg" component="main">
			<Wrapper>
				<Title>Projects</Title>
				<div className={classes.dynamicgrid}>
					<Grid
						container
						spacing={2}
						direction="row"
						justify="flex-start"
						alignItems="flex-start">
						{projects.length ? (
							projects.map((project, index) => {
								return (
									<Grid item xs={12} sm={6} md={4} key={project._id}>
										<ProjectCard
											key={project._id}
											id={project._id}
											title={project.title}
											description={project.description}
											createdAt={project.createdAt}
											updatedAt={project.updatedAt}
											creator={project.creator.username}
											admins={project.admins}
											members={project.members}></ProjectCard>
									</Grid>
								);
							})
						) : (
							<Grid item xs={12}>
								<Typography paragraph>
									No projects to display. Start one today!
								</Typography>
							</Grid>
						)}
					</Grid>
				</div>
			</Wrapper>
			<ProjectDialog
				open={openCreate}
				setOpen={setOpenCreate}
				reloadProjects={loadProjects}></ProjectDialog>
			<Fab
				className={clsx(classes.fab)}
				color="secondary"
				variant="extended"
				onClick={() => {
					console.log("clicked");
					setOpenCreate(true);
				}}>
				<Add></Add>
				New Project
			</Fab>
		</Container>
	);
};

export default Dashboard;
