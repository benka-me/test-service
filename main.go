package main

import (
	"github.com/benka-me/laruche/go-pkg/discover"
	"github.com/urfave/cli"
	"github.com/benka-me/test-service/go-pkg/http/rpc"
	"os"
	"fmt"
	"log"
)

func main() {
	app := cli.NewApp()
	app.Commands = cli.Commands{
		{
			Name: "dev",
			Action: func(context *cli.Context) error {
				if len(os.Args) < 3 {
			        fmt.Println("usage: exec author/service-name")
			        os.Exit(0)
				}
				engine, err := discover.ParseEngine(os.Args[2], true)
		        if err != nil {
			        log.Fatal(err)
		        }
				rpc.Server_2_0(*engine)
				return nil
			},
		},
	}

	app.Action = func(c *cli.Context) error {
		if len(os.Args) < 2 {
			fmt.Println("usage: exec author/service-name")
			os.Exit(0)
		}
		engine, err := discover.ParseEngine(os.Args[1], false)
		if err != nil {
			log.Fatal(err)
		}
		rpc.Server_2_0(*engine)
		return nil
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
