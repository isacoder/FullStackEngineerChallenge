import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { getByReceiverId, getByReviewerId, getEmployeeById, getReactions } from '../../actions/api';
import styled from 'styled-components';
import Colors from '../utils/Colors';
import Tabs, { TAB_COLORS } from '../molecules/Tabs';
import Profile from '../molecules/Profile';
import DoneReview from '../molecules/DoneReview';
import ReactionAlert from '../molecules/ReactionAlert';
import { SectionTitle } from '../utils/Fonts';
import ReviewEditor from '../organisms/ReviewEditor';

const Container = styled.div`
  @media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ 
    max-width: 800px;
    margin: 20px auto;
  }
`;

const TabContainer = styled.div`
padding: 0 24px;
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ 
  border: 1px solid ${TAB_COLORS.base};

  padding: 0 40px; 
}
`;

const MyProfile = styled(Profile)`
  margin: 20px auto;
  justify-content: center;
`;

const StyledAlert = styled(ReactionAlert)``;

const ReactionTabs = styled.div`
  display: flex;
  justify-content: center;
  ${StyledAlert} {
    margin: 0 10px; 
  }
`;

const StyledComment = styled(DoneReview)``;

const CommentsList = styled.div`
  margin-top: 30px;
  ${StyledComment} {
    margin: 15px 0;
  }
`;

const StatCircle = styled.div`
   height: 50px;
   width: 50px;
   border-radius: 50%;
   border: 5px solid ${Colors.gray3};
   display: flex;
   justify-content: center;
   align-items: center;
`;

const TeamStats = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${StatCircle}{
    margin-right: 20px;
  }
`;

const TeamReview = styled(ReviewEditor)``;

const ReviewsList = styled.div`
  margin: 20px 0;
  ${TeamReview}{
    margin: 15px 0;
  }
`;

const transformDate = (dateText) => {
  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
  const date = new Date(dateText);
  const dateArray = dateFormat.formatToParts(date);
  const formatedDate = dateArray[2].value + ' ' + dateArray[0].value + ' ' + dateArray[4].value;
  return formatedDate;

}

const mapObject = (object, callback) => {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}


const reactionsDefault = { training: 0, mvp: 0, nice_job: 0, no_clue: 0 };
const reactionsDefault2 = [
  { name: 'training', value: 0 },
  { name: 'mvp', value: 0 },
  { name: 'nice_job', value: 0 },
  { name: 'no_clue', value: 0 }];

const EmployeeView = ({ userId, props }) => {
  const [activeTab, setActiveTab] = useState('mine');
  const [userReviews, setUserReviews] = useState([]);
  const [teamsReviews, setTeamReviews] = useState([]);
  const [userReactions, setUserReactions] = useState(reactionsDefault);
  const [reactions, setReactions] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleTabs = useCallback((tabKey) => {
    setActiveTab(tabKey);
  }, []);

  async function fetchData() {
    console.log('fetching data');
    setIsLoading(true);
    try {
      const employee = await getEmployeeById(userId);
      setUser(employee);

      const received = await getByReceiverId(userId);
      setUserReviews(received);

      const requiredRev = await getByReviewerId(userId);
      setTeamReviews(requiredRev);

      const apiReactions =  await getReactions();
      setReactions(apiReactions);

      let reactionsAcc = reactionsDefault;

      received.forEach(({ reaction }, index) => {
        reactionsAcc[reaction.name] = +1;
        setUserReactions(reactionsAcc);

      });

    } catch (error) {
    }
    setIsLoading(false);
  }

  const loadConfig = useEffect(() => {
    fetchData();
  }, [])


  return (isLoading ? <div>Loading ... </div> :
    <Container>
      <Tabs activeKey={activeTab} handleTabClick={handleTabs} tabsList={[{ text: 'My Reviews', tabKey: 'mine' }, { text: 'Team Reviews', tabKey: 'yours' }]} />
      <TabContainer>
        {activeTab === 'mine' ? <div className="PersonalReviews" >
          <MyProfile
            name={user.name}
            photo_url={user.avatar_url}
            title={user.title}
          />
          <ReactionTabs>
            {Object.keys(userReactions).map((key, index) => {
              return <StyledAlert key={'key' + key} reactionName={key} alerts={userReactions[key]}></StyledAlert>
            })}
          </ReactionTabs>
          <CommentsList>
            <SectionTitle>{!userReviews ? "You have no reviews, if you were expecting some contact your admin." : "All Reviews"}</SectionTitle>
            {!userReviews ? null : <Fragment>
              {userReviews.map(({ reaction, reviewer, comment, updated_at }, index) => {
                return (
                  <StyledComment
                    key={'comment' + index + updated_at}
                    reviewIcon={reaction.name}
                    comment={comment}
                    date={transformDate(updated_at)}
                    reviewer={reviewer.title + ' - ' + reviewer.name}
                  />
                )
              })}
            </Fragment>
            }

          </CommentsList>
        </div> :
          <div className='TeamReviews'>
            <TeamStats>
              <StatCircle>{teamsReviews.length}</StatCircle>
              <div>Reviews waiting</div>
            </TeamStats>
            <div className='ReviewsTitle'>Lots of reviews!</div>
            <ReviewsList>
              {teamsReviews.map(({ receiver, id }, index) => {
                return <TeamReview
                  key={`${receiver.id}_${index}`}
                  reviewId={id}
                  receiver={receiver}
                  reactionList={reactions}
                  updateData={() => fetchData()}
                />
              })
              }
            </ReviewsList>

          </div>
        }
      </TabContainer>
    </Container>
  );
}

export default EmployeeView;