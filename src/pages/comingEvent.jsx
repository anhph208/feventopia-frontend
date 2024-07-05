import React from "react";

const comingUpEvent = () => {
    
    return(
        <div className="form-wrapper">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="coming-soon-area">
						<div className="d-table">
							<div className="d-table-cell">
								<div className="row justify-content-center">
									<div className="col-xl-7 col-lg-8">
										<div className="coming-soon-content bp-form">
											<h2>We're coming soon.</h2>
											<p className="fs-16 mt-4">is working hard to launch a new site that's going to revolutionize the way you do business. Stay tuned!</p>
											<div id="timer" className="flex-wrap d-flex justify-content-center">
												<div id="days" className="align-items-center flex-column d-flex justify-content-center">00<span>Days</span></div>
												<div id="hours" className="align-items-center flex-column d-flex justify-content-center">00<span>Hours</span></div>
												<div id="minutes" className="align-items-center flex-column d-flex justify-content-center">00<span>Minutes</span></div>
												<div id="seconds" className="align-items-center flex-column d-flex justify-content-center">00<span>Seconds</span></div>
											</div>
											
											<form className="newsletter-form mt-4">
												<div className="form-group">
													<div className="loc-group position-relative">
														<input className="form-control h_50" type="password" placeholder="Enter your password"/>
														<button className="main-btn subscribe-btn btn-hover h_40" type="submit">Subscribe</button>
													</div>
												</div>
												<p className="mb-0 mt-1 text-start fs-12">No Spam, we promise.</p>
											</form>
											<div className="copyright-footer mt-5">
												© 2022, Barren. All rights reserved. Powered by FEventopia
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}
export default comingUpEvent;