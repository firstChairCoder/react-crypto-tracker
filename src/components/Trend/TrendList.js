import React, { useEffect } from "react"
import { Row, Col, Spinner, Alert } from "react-bootstrap"
import TrendCard from "@/components/Trend/TrendCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchTrendData } from "@/features/trend/TrendSlice"
import "./Trend.scss"

const TrendList = () => {
  const dispatch = useDispatch()

  const { coins } = useSelector(state => state.trend.data)
  const isLoading = useSelector(state => state.trend.loading)
  const error = useSelector(state => state.trend.error)

  useEffect(() => {
    dispatch(fetchTrendData())
  }, [dispatch])

  if (!coins) {
    return <div>It is not loaded.</div>
  }

  return (
    <div className="section-gap">
      <div className="section-head">
        <div className="section-title">Trending Coins (24h)</div>
      </div>

      {isLoading && (
        <div className="my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <div className="my-4">
          <Alert variant="warning">
            An error occured to fetch trending coins
          </Alert>
        </div>
      )}

      {coins && coins.length ? (
        <Row>
          {coins.slice(0, 6).map((coin, i) => (
            <Col lg={4} sm={6} key={i} className="mb-3">
              <TrendCard item={coin.item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="warning">It was not found</Alert>
      )}
    </div>
  )
}

export default TrendList
