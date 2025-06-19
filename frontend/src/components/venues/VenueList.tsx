import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Divider,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Event as EventIcon,
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
  Sort as SortIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useGetVenuesQuery, useDeleteVenueMutation } from '../../redux/services/venueApi';

interface VenueListProps {
  searchTerm?: string;
}

interface Venue {
  venue_id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  capacity?: number;
  amenities?: Record<string, boolean>;
}

const VenueList: React.FC<VenueListProps> = ({ searchTerm = '' }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState(searchTerm);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    city: '',
    state: '',
    country: '',
    capacityMin: '',
    capacityMax: ''
  });

  // Replace with actual API calls when backend is connected
  const { data, error, isLoading, refetch } = useGetVenuesQuery({
    name: search,
    city: filter.city,
    state: filter.state,
    country: filter.country,
    capacity_min: filter.capacityMin,
    capacity_max: filter.capacityMax,
    sort_by: sortField,
    sort_order: sortOrder,
    page,
    limit
  });

  const [deleteVenue, { isLoading: isDeleting }] = useDeleteVenueMutation();

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleLimitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(event.target.value as number);
    setPage(1);
  };

  const handleDelete = (venueId: string) => {
    setVenueToDelete(venueId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (venueToDelete) {
      try {
        await deleteVenue(venueToDelete).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete venue', err);
      }
      setDeleteDialogOpen(false);
      setVenueToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setVenueToDelete(null);
  };

  const handleAddVenue = () => {
    navigate('/venues/new');
  };

  const handleEditVenue = (venueId: string) => {
    navigate(`/venues/edit/${venueId}`);
  };

  const handleViewVenue = (venueId: string) => {
    navigate(`/venues/${venueId}`);
  };

  const renderAmenityChips = (amenities?: Record<string, boolean>) => {
    if (!amenities) return null;

    const enabledAmenities = Object.entries(amenities)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => key);

    return (
      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
        {enabledAmenities.slice(0, 3).map((amenity) => (
          <Chip
            key={amenity}
            label={amenity.replace('_', ' ')}
            size="small"
            variant="outlined"
            color="primary"
          />
        ))}
        {enabledAmenities.length > 3 && (
          <Chip
            label={`+${enabledAmenities.length - 3} more`}
            size="small"
            variant="outlined"
          />
        )}
      </Stack>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Venues
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddVenue}
        >
          Add Venue
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search venues..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={filter.city}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={filter.state}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={filter.country}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              name="capacityMin"
              label="Min Capacity"
              type="number"
              value={filter.capacityMin}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField
              fullWidth
              name="capacityMax"
              label="Max Capacity"
              type="number"
              value={filter.capacityMax}
              onChange={handleFilterChange}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SortIcon color="action" />
              <Typography variant="body2">Sort by:</Typography>
              <Button
                size="small"
                onClick={() => handleSortChange('name')}
                color={sortField === 'name' ? 'primary' : 'inherit'}
                endIcon={sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              >
                Name
              </Button>
              <Button
                size="small"
                onClick={() => handleSortChange('capacity')}
                color={sortField === 'capacity' ? 'primary' : 'inherit'}
                endIcon={sortField === 'capacity' && (sortOrder === 'asc' ? '↑' : '↓')}
              >
                Capacity
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Results per page</InputLabel>
              <Select
                value={limit}
                onChange={handleLimitChange}
                label="Results per page"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {isLoading && <LinearProgress />}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading venues. Please try again later.
        </Alert>
      )}

      {data?.data && data.data.length === 0 && (
        <Alert severity="info">No venues found. Try adjusting your search criteria.</Alert>
      )}

      <Grid container spacing={3}>
        {data?.data?.map((venue: Venue) => (
          <Grid item xs={12} sm={6} lg={4} key={venue.venue_id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {venue.name}
                  </Typography>
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEditVenue(venue.venue_id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(venue.venue_id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {[venue.city, venue.state, venue.country].filter(Boolean).join(', ')}
                  </Typography>
                </Box>
                
                {venue.capacity && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Capacity: {venue.capacity}
                  </Typography>
                )}
                
                {renderAmenityChips(venue.amenities)}
                
                <Divider sx={{ my: 1.5 }} />
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleViewVenue(venue.venue_id)}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {data && data.count > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={data.total_pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Delete Venue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this venue? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VenueList;