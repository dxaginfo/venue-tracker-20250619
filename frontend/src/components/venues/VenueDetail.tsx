import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tab,
  Tabs,
  Paper,
  LinearProgress,
  Alert,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as WebsiteIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Star as StarIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useGetVenueByIdQuery, useDeleteVenueMutation } from '../../redux/services/venueApi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`venue-tabpanel-${index}`}
      aria-labelledby={`venue-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `venue-tab-${index}`,
    'aria-controls': `venue-tabpanel-${index}`,
  };
}

const VenueDetail: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: venue, error, isLoading } = useGetVenueByIdQuery(venueId || '');
  const [deleteVenue, { isLoading: isDeleting }] = useDeleteVenueMutation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    navigate('/venues');
  };

  const handleEdit = () => {
    navigate(`/venues/edit/${venueId}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (venueId) {
      try {
        await deleteVenue(venueId).unwrap();
        navigate('/venues');
      } catch (err) {
        console.error('Failed to delete venue', err);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const renderAmenities = (amenities?: Record<string, boolean>) => {
    if (!amenities) return <Typography>No amenities information available</Typography>;

    const enabledAmenities = Object.entries(amenities)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key.replace('_', ' '));

    if (enabledAmenities.length === 0) {
      return <Typography>No amenities available</Typography>;
    }

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {enabledAmenities.map((amenity) => (
          <Chip
            key={amenity}
            label={amenity}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading venue details. Please try again later.
      </Alert>
    );
  }

  if (!venue) {
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        Venue not found.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Venues
        </Button>
        <Box>
          <Button
            startIcon={<EditIcon />}
            variant="outlined"
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {venue.name}
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon color="action" sx={{ mr: 1 }} />
                <Typography>
                  {[venue.address, venue.city, venue.state, venue.zip_code, venue.country]
                    .filter(Boolean)
                    .join(', ')}
                </Typography>
              </Box>
              
              {venue.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PhoneIcon color="action" sx={{ mr: 1 }} />
                  <Typography>{venue.phone}</Typography>
                </Box>
              )}
              
              {venue.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmailIcon color="action" sx={{ mr: 1 }} />
                  <Typography>{venue.email}</Typography>
                </Box>
              )}
              
              {venue.website && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WebsiteIcon color="action" sx={{ mr: 1 }} />
                  <Typography>
                    <a href={venue.website} target="_blank" rel="noopener noreferrer">
                      {venue.website}
                    </a>
                  </Typography>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Venue Details
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon color="action" sx={{ mr: 1 }} />
                  <Typography>Capacity: {venue.capacity || 'Not specified'}</Typography>
                </Box>
                
                {/* Rating summary */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StarIcon color="action" sx={{ mr: 1 }} />
                  <Typography>
                    Rating: {venue.ratings?.length > 0 
                      ? `${(venue.ratings.reduce((acc, r) => acc + r.overall_rating, 0) / venue.ratings.length).toFixed(1)}/5.0 (${venue.ratings.length} ratings)` 
                      : 'No ratings yet'}
                  </Typography>
                </Box>
                
                {/* Booking summary */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventNoteIcon color="action" sx={{ mr: 1 }} />
                  <Typography>
                    Bookings: {venue.bookings?.length || 0} total
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="venue tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Amenities" {...a11yProps(1)} />
            <Tab label="Contacts" {...a11yProps(2)} />
            <Tab label="Bookings" {...a11yProps(3)} />
            <Tab label="Ratings" {...a11yProps(4)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Description</Typography>
          <Typography paragraph>
            {venue.description || 'No description available.'}
          </Typography>
          
          {venue.load_in_info && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Load-In Information</Typography>
              <Typography paragraph>
                {venue.load_in_info}
              </Typography>
            </>
          )}
          
          {venue.parking_info && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Parking Information</Typography>
              <Typography paragraph>
                {venue.parking_info}
              </Typography>
            </>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Amenities</Typography>
          {renderAmenities(venue.amenities)}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Contacts</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              onClick={() => navigate(`/venues/${venueId}/contacts/new`)}
            >
              Add Contact
            </Button>
          </Box>
          
          {!venue.contacts || venue.contacts.length === 0 ? (
            <Alert severity="info">No contacts available for this venue.</Alert>
          ) : (
            <List>
              {venue.contacts.map((contact) => (
                <ListItem
                  key={contact.contact_id}
                  secondaryAction={
                    <Tooltip title="Edit">
                      <IconButton edge="end" aria-label="edit" onClick={() => navigate(`/venues/${venueId}/contacts/${contact.contact_id}/edit`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar sx={{ mr: 2 }}>{contact.first_name?.[0] || 'C'}</Avatar>
                  <ListItemText
                    primary={`${contact.first_name} ${contact.last_name}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {contact.title || 'No title'} {contact.email && `• ${contact.email}`}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          {contact.phone || 'No phone number'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Bookings</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              onClick={() => navigate(`/venues/${venueId}/bookings/new`)}
            >
              Add Booking
            </Button>
          </Box>
          
          {!venue.bookings || venue.bookings.length === 0 ? (
            <Alert severity="info">No bookings available for this venue.</Alert>
          ) : (
            <List>
              {venue.bookings.map((booking) => (
                <ListItem
                  key={booking.booking_id}
                  secondaryAction={
                    <Tooltip title="Edit">
                      <IconButton edge="end" aria-label="edit" onClick={() => navigate(`/venues/${venueId}/bookings/${booking.booking_id}/edit`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    primary={booking.event_name || 'Unnamed Event'}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {new Date(booking.event_date).toLocaleDateString()} • {booking.status}
                        </Typography>
                        {booking.fee && (
                          <>
                            <br />
                            <Typography component="span" variant="body2">
                              Fee: ${booking.fee}
                            </Typography>
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Ratings & Reviews</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              size="small"
              onClick={() => navigate(`/venues/${venueId}/ratings/new`)}
            >
              Add Rating
            </Button>
          </Box>
          
          {!venue.ratings || venue.ratings.length === 0 ? (
            <Alert severity="info">No ratings available for this venue.</Alert>
          ) : (
            <List>
              {venue.ratings.map((rating) => (
                <ListItem key={rating.rating_id}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', mr: 1 }}>
                          {[...Array(5)].map((_, index) => (
                            <StarIcon
                              key={index}
                              color={index < rating.overall_rating ? 'primary' : 'disabled'}
                              fontSize="small"
                            />
                          ))}
                        </Box>
                        <Typography variant="subtitle2">
                          {rating.title || `Rating on ${new Date(rating.created_at).toLocaleDateString()}`}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {rating.comments || 'No comments provided'}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(rating.created_at).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </TabPanel>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Venue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {venue.name}? This action cannot be undone and will remove all associated contacts, bookings, and ratings.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VenueDetail;