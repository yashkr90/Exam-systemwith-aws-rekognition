

function ExamDashboard() {
    return (
        <div class="g-sidenav-show bg-gray-100">
            <aside
                class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
                id="sidenav-main"
            >
                <div class="sidenav-header">
                    <i
                        class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                        aria-hidden="true"
                        id="iconSidenav"
                    ></i>
                    <a
                        class="navbar-brand m-0"
                        href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
                        target="_blank"
                    >
                        <img
                            src="./assets/img/logo-ct.png"
                            class="navbar-brand-img h-100"
                            alt="main_logo"
                        />
                        <span class="ms-1 font-weight-bold text-white"
                        >Material Dashboard 2</span
                        >
                    </a>
                </div>

                <hr class="horizontal light mt-0 mb-2" />

                <div class="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-white" href="./dashboard.html">
                                <div
                                    class="text-white text-center me-2 d-flex align-items-center justify-content-center"
                                >
                                    <i class="material-icons opacity-10">dashboard</i>
                                </div>

                                <span class="nav-link-text ms-1">Dashboard</span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link text-white" href="./tables.html">
                                <div
                                    class="text-white text-center me-2 d-flex align-items-center justify-content-center"
                                >
                                    <i class="material-icons opacity-10">table_view</i>
                                </div>

                                <span class="nav-link-text ms-1">Tables</span>
                            </a>
                        </li>


                    </ul>
                </div>

                <div class="sidenav-footer position-absolute w-100 bottom-0">
                    <div class="mx-3">
                        <a
                            class="btn btn-outline-primary mt-4 w-100"
                            href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard?ref=sidebarfree"
                            type="button"
                        >Documentation</a
                        >
                        <a
                            class="btn bg-gradient-primary w-100"
                            href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree"
                            type="button"
                        >Upgrade to pro</a
                        >
                    </div>
                </div>
            </aside>

            <div class="main-content border-radius-lg">
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-lg-7 position-relative z-index-2">
                            <div class="card card-plain mb-4">
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="d-flex flex-column h-100">
                                                <h2 class="font-weight-bolder mb-0">
                                                    General Statistics
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-5 col-sm-5">
                                    <div class="card mb-2">
                                        <div class="card-header p-3 pt-2">
                                            <div
                                                class="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute"
                                            >

                                            </div>
                                            <div class="text-end pt-1">
                                                <p class="text-sm mb-0 text-capitalize">Bookings</p>
                                                <h4 class="mb-0">281</h4>
                                            </div>
                                        </div>

                                        <hr class="dark horizontal my-0" />
                                        <div class="card-footer p-3">
                                            <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder"
                                                >+55% </span
                                                >than last week
                                            </p>
                                        </div>
                                    </div>

                                    <div class="card mb-2">
                                        <div class="card-header p-3 pt-2">
                                            <div
                                                class="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute"
                                            >
                                                <i class="material-icons opacity-10">leaderboard</i>
                                            </div>
                                            <div class="text-end pt-1">
                                                <p class="text-sm mb-0 text-capitalize">Today's Users</p>
                                                <h4 class="mb-0">2,300</h4>
                                            </div>
                                        </div>

                                        <hr class="dark horizontal my-0" />
                                        <div class="card-footer p-3">
                                            <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder"
                                                >+3% </span
                                                >than last month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-sm-5 mt-sm-0 mt-4">
                                    <div class="card mb-2">
                                        <div class="card-header p-3 pt-2 bg-transparent">
                                            <div
                                                class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute"
                                            >
                                                <i class="material-icons opacity-10">store</i>
                                            </div>
                                            <div class="text-end pt-1">
                                                <p class="text-sm mb-0 text-capitalize">Revenue</p>
                                                <h4 class="mb-0">34k</h4>
                                            </div>
                                        </div>

                                        <hr class="horizontal my-0 dark" />
                                        <div class="card-footer p-3">
                                            <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder"
                                                >+1% </span
                                                >than yesterday
                                            </p>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header p-3 pt-2 bg-transparent">
                                            <div
                                                class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute"
                                            >
                                                <i class="material-icons opacity-10">person_add</i>
                                            </div>
                                            <div class="text-end pt-1">
                                                <p class="text-sm mb-0 text-capitalize">Followers</p>
                                                <h4 class="mb-0">+91</h4>
                                            </div>
                                        </div>

                                        <hr class="horizontal my-0 dark" />
                                        <div class="card-footer p-3">
                                            <p class="mb-0">Just updated</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ExamDashboard