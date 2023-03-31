import React from "react"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Jumbotron from "react-bootstrap/Jumbotron"
import ListGroup from "react-bootstrap/ListGroup"
import Row from "react-bootstrap/Row"

import { gql, useQuery } from "@apollo/client"

import { GRAPHQL_URI } from "../lib/config"
import { useRouter } from "next/router"

const GET_NODE_STATS = gql`
  query nodeIds {
    globals {
      nodesIds
    }
  }
`

function Home() {
  const nodeUrl = GRAPHQL_URI.includes("staging")
    ? `https://mempool.space/signet/lightning/node/`
    : `https://mempool.space/lightning/node/`
  const { loading, error, data } = useQuery(GET_NODE_STATS)

  const router = useRouter()
  const [username, setUsername] = React.useState<string>("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    router.push(
      {
        pathname: username,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <h2>결제 후 비트코인 전송 받을 주소 입력</h2>
          <br />
          <Jumbotron>
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <label>Node Public Key: </label>{" "}
                          <p style={{ fontSize: "small", overflowWrap: "break-word" }}>
                            {error
                              ? "Unavailable"
                              : loading
                              ? "Loading..."
                              : data.globals.nodesIds[0]}
                          </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          {error ? (
                            "Unavailable"
                          ) : loading ? (
                            "Loading..."
                          ) : (
                            <a href={nodeUrl + `${data.globals.nodesIds[0]}`}>
                              라이트닝 노드 정보
                            </a>
                          )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <form
                            className="username-form"
                            autoComplete="off"
                            onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                              handleSubmit(event)
                            }
                          >
                            <label htmlFor="username">
                               <strong>POS</strong> 결제를 위해, Beach wallet 비트코인 라이트닝 주소를 입력해주세요. (username@pay.bbw.sv)
                            </label>
                            <input
                              type="text"
                              name="username"
                              value={username}
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                setUsername(event.target.value)
                              }
                              placeholder="username을 입력하세요."
                              required
                            />
                            <button>입력</button>
                          </form>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <hr />
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
