export default {
  navigation: {
    sidenav: [
      {
        id: "0",
        name: "Product",
        icon: {
          id: "FaCloudsmith",
          color: "lightgreen"
        }
      },
      {
        id: "1",
        name: "Projects",
        icon: {
          id: "FaCompass",
          color: "white"
        },
        menu: [
          {
            id: "1",
            name: "Project1",
            menu: [
              {
                id: "1",
                name: "Dashboards",
                icon: "",
                menu: [
                  {
                    id: "1",
                    name: "Dashboard 1",
                    layout: []
                  },
                  {
                    id: "2",
                    name: "Dashboard 12"
                  }
                ]
              }
            ]
          },
          {
            id: "1",
            name: "Project 2",
            menu: [
              {
                id: "1",
                name: "Dashboards",
                menu: [
                  {
                    id: "1",
                    name: "Dashboard 1"
                  },
                  {
                    id: "2",
                    name: "Dashboard 12"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "3",
        name: "Settings",
        icon: {
          id: "FaQrcode",
          color: "white"
        }
      },
      {
        id: "4",
        name: "Profile",
        icon: {
          id: "FaMugHot",
          color: "white"
        }
      }
    ]
  }
};
