package rpc

import (
	"context"
	"fmt"
	"github.com/benka-me/test-service/go-pkg/test"
)

func (c *App) HelloWorld(ctx context.Context, req *test.Request) (*test.Greeting, error) {

	return &test.Greeting{Msg: fmt.Sprintf("Hello %s", req.Msg)}, nil
}
